<?php

namespace App\Http\Requests;

use App\Models\Table;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $table = request()->route('table');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Table::class)->ignore($table),
            ],
            'capacity' => [
                'nullable',
                'integer',
                'min:1',
                'max:50',
            ],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Table name is required.',
            'name.unique' => 'A table with this name already exists.',
            'capacity.integer' => 'Capacity must be a number.',
            'capacity.min' => 'Capacity must be at least 1.',
            'capacity.max' => 'Capacity cannot exceed 50.',
        ];
    }
}

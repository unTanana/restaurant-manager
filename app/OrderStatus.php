<?php

namespace App;

enum OrderStatus: string
{
    case New = 'new';
    case InProcess = 'in_process';
    case Ready = 'ready';
    case Served = 'served';
    case Done = 'done';
}

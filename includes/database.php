<?php

$db = mysqli_connect('localhost', 'root', 'root', 'fild');

if(!$db){
    echo "hubo un error";
    exit;
}
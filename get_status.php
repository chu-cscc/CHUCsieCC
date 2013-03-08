#!/usr/bin/env php
<?php
$server_list = array(
	8 => '140.126.21.8',
	11 => '140.126.21.11',
	20 => '140.126.21.20'
);

$status = array();
$status_file = realpath(dirname(__FILE__)) . '/status.json';

foreach ($server_list as $index => $ip) {
	$result = exec('nmap -sP ' . $ip);
	$status[$index] = preg_match("/1 host up/", $result) == 1;
}

date_default_timezone_set('Asia/Taipei');
$status['date'] = date('Y-m-d H:i:s');
$status['timestamp'] = time();

fwrite(fopen($status_file, 'w'), json_encode($status));
#!/usr/bin/env php
<?php
	$server_list = array(
		8 => '140.126.21.8',
		11 => '140.126.21.11',
		20 => '140.126.21.20'
	);

	$output = array();

	foreach ($server_list as $index => $ip) {
		$result = exec('nmap -sP ' . $ip);
		$output[$index] = preg_match("/1 host up/", $result) == 1;
	}

	date_default_timezone_set('Asia/Taipei');
	$output['date'] = date('Y-m-d h:i:s');

	fwrite(fopen('./status.json', "w+"), json_encode($output));
?>
<?php
$server_list = array(
	8 => '140.126.21.8',
	11 => '140.126.21.11',
	20 => '140.126.21.20'
);

$interval = 1800;
$status_file = '/tmp/server_status.json';

$get_status = function() use($server_list, $status_file) {
	$status = array();

	foreach ($server_list as $index => $ip) {
		$result = exec('nmap -sP ' . $ip);
		$status[$index] = preg_match("/1 host up/", $result) == 1;
	}

	date_default_timezone_set('Asia/Taipei');
	$status['date'] = date('Y-m-d h:i:s');
	$status['timestamp'] = time();

	fwrite(fopen($status_file, 'w'), json_encode($status));

	return $status;
};

if (!file_exists($status_file)) {
	$status = $get_status();
}
else {
	$json = fread(fopen($status_file, 'r'), 1024);
	$status = json_decode($json, true);

	if (time() - $status['timestamp'] > $interval)
		$status = $get_status();
}
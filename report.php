<?php
header('Cache-Control: no-cache, must-revalidate');
header("Expires: Sat, 26 Jul 1997 05:00:00 GTM"); // Set date in the past
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

/** Include PHPExcel_IOFactory */
require_once 'phpexcel/Classes/PHPExcel/IOFactory.php';

if (!file_exists("report.xls")) {
	die("There is no Excel file to read from");
}

$objPHPExcel = PHPExcel_IOFactory::load("report.xls");
$objWorksheet = $objPHPExcel->getActiveSheet();

define('MONTHS_IN_REPORT', 4);	//to be set to 100

$pre_location = array("Location" => []);
$location = array($pre_location); // aka $name_array[0]
$area = array(); // aka $name_array[0]
$month = array(); // aka $name_array[0]
$score = array(); // aka $name_array[0]

$mystery_shopping = array($location, $area, $month, $score);

for ($col = 0; $col < count($mystery_shopping); $col++) {
	for ($row = 1; $row <= MONTHS_IN_REPORT + 1; $row++) { // get 100 rows total
		$mystery_shopping[$col][$row - 1] =
			$objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
	}
}

$myfile = fopen("data.json", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($mystery_shopping, JSON_PRETTY_PRINT));
fclose($myfile);

//echo $mystery_shopping[0];

echo json_encode($mystery_shopping, JSON_PRETTY_PRINT);

?>
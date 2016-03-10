<?php

/** AJAX handler
 */

include_once 'edgelib/edgelib.inc.php';

/** AJAX response class
 * 
 */
class Ajax extends EdgeSiteAjax {
	public function listScripts() {
		if (!$_REQUEST['userId'])
			throw new EdgeException('No user ID parameter!');
		$formulas = array('SF-103', 'SC-200', 'HA', 'XXX', 'TEST');
		$names = EdgeTestData::generateNames(count($formulas), EdgeTestData::NAME_FORMAT_ARRAY);
		$scripts = array();
		for ($i = 0; $i < count($formulas); $i++) {
			$scripts[] = array('id' => $i+1, 'formula' => $formulas[$i], 'lastname' => $names[$i][0], 'firstname' => $names[$i][1], 'gender' => $names[$i][2]);
		}
		$this->data = array('userId' => $_REQUEST['userId'], 'scripts' => $scripts);
	}	
}

/** Handle the request */
$ajax = new Ajax($u);
$ajax->handle(true);

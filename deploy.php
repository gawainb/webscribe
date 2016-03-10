<?php
	putenv("GIT_SSL_NO_VERIFY=true");
	if ($_REQUEST['deploy']) {
		exec("git checkout {$_REQUEST['branch']}", $pulloutput);
		exec("git pull", $pulloutput);
		$result = nl2br(htmlspecialchars(join("\n", $pulloutput)));
	}
	$gitBranch = exec("git branch | grep '^[*]' | sed -e 's/[*] //'");
	exec("git log '--pretty=format:%ad: (%an) %s%+b' -n 1", $output);
	$lastChange = nl2br(htmlspecialchars(join("\n", $output)));
?>
<!DOCTYPE html>
<html>
	<head><title>Deploy from git</title></head>
	<body>
<?	if ($result) { ?>
		<p><b>git result:</b><div style="border:solid gray 1px;padding:5px"><?= $result ?></div></p>
<?
	}
	foreach (explode(' ', 'master devel') as $b) {
		$bopts .= '<option value="'.$b.'"';
		if ($b == $gitBranch)
			$bopts .= 'selected' ;
		$bopts .= ">$b</option>";
	}
?>
		<p><b>Branch:</b> <?= $gitBranch ?></p>
		<p><b>Last Change:</b><div style="border:solid gray 1px;padding:5px"><?= $lastChange ?></div></p>
		<form method="POST">
			<p><select name="branch"><?= $bopts ?></select></p>
			<p><button type="submit" name="deploy" value="1">Deploy latest git code</button></p>
		</form>
	</body>
</html>
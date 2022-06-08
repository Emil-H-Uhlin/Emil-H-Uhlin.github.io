<?php

$html = file_get_contents("home.html");

header("Content-type: text/html");

echo $html;
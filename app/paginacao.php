<?php

// configurar fora do arquivo a query
// ex: $query = "SELECT * FROM agenda ORDER BY data DESC ";

$contagem = mysql_query("$query");
$numero_count = mysql_num_rows($contagem);

if ($nopag == true) {
    $num_por_pagina = $total;
} else {
    $num_por_pagina = 15;
}


$pagina = $_GET['pagina'];

// descobre o num. da pg e se for nulo seta como 1
if (!$pagina) {
    $pagina = 1;
}

if ($pagina < 1) {
    $pagina = 1;
}




###########################






###########################

$primeiro_registro = ($pagina*$num_por_pagina) - $num_por_pagina;

$consulta = "$query LIMIT $primeiro_registro, $num_por_pagina";

// executar query
$sql = mysql_query($consulta);
$num_linhas = mysql_num_rows($sql);

$total_usuarios = $numero_count;

// construa e exiba um painel de navegabilidade entre as pÃ¡ginas
$total_paginas = $total_usuarios/$num_por_pagina;

$prev = $pagina - 1;
$next = $pagina + 1;

// se pg for > 1 - temos link p/ anterior
if ($pagina > 1) {
    $prev_link = '<li class="page-item"><a class="page-link" href="'.$PHP_SELF.'?pagina='.$prev.'" aria-label="Anterior"> <span aria-hidden="true">&laquo;</span></a></li>';
} else { // se não não há link
    $prev_link = '';
}

// agora verifica se necessita proxima pg
if ($total_paginas > $pagina) {
    $next_link = '<li class="page-item"><a class="page-link" href="'.$PHP_SELF.'?pagina='.$next.'" aria-label="Próxima"><span aria-hidden="true">&raquo;</span></a></li>';
} else {
    // se não precisar...
    $next_link =  '';
    ;
}

$total_paginas = ceil($total_paginas);
$painel = "";


$aparece_indice = 5; // numeros impares
$cada_lado = ($aparece_indice-1)/2;

$indiceP = $pagina - $cada_lado;
$indiceU = $pagina + $cada_lado;

if ($pagina == 1) {
    $indiceU = $indiceU + $cada_lado;
} elseif ($pagina == 2) {
    $indiceU = $indiceU + ($cada_lado-1);
}

if ($pagina == $total_paginas) {
    $indiceP = $indiceP - $cada_lado;
} elseif ($pagina == ($total_paginas-1)) {
    $indiceP = $indiceP - ($cada_lado-1);
}

for ($x = $indiceP; $x <= $indiceU; $x++) {
    if ($x >= 1 && $x <= $total_paginas) {
        if ($x==$pagina) {
            $painel .= '<li class="page-item active"><a title="'.$x.$variaveis_url.'" class="page-link" href="#">'.$x.'</a></li>';
        } else {
            $painel .= '<li class="page-item"><a title="'.$x.$variaveis_url.'" class="page-link" href="'.$PHP_SELF.'?pagina='.$x.$variaveis_url.'">'.$x.'</a></li>';
        }
    }
}

if ($pagina > 1) {
    $primeira_pg = '<a href="'.$PHP_SELF.'?pagina=1'.$variaveis_url.'" title="Primeira página">&laquo; Primeira</a>';
}
if ($pagina < $total_paginas) {
    $ultima_pg = '<a href="'.$PHP_SELF.'?pagina='.$total_paginas.$variaveis_url.'" title="Última página">Última &raquo;</a>';
}

// exibir painel na tela

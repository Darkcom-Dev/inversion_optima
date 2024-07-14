
function descriptive_stats_element(stats, element_id='descriptive_stats_selected') {
    const stats_table = document.getElementById(element_id);
    stats_table.innerHTML = '<tr><th>media</th><th>mediana</th><th>moda</th><th>desviación estándar</th><th>minimo</th><th>maximo</th></tr>';
    stats_table.innerHTML += '<tr><td class="text-right">'+ stats.descriptive_unit_value.mean + '</td><td class="text-right">'+ stats.descriptive_unit_value.median + '</td><td class="text-right">'+ stats.descriptive_unit_value.mode + '</td><td class="text-right">'+ stats.descriptive_unit_value.std + '</td><td class="text-right">'+ stats.descriptive_unit_value.min + '</td><td class="text-right">'+ stats.descriptive_unit_value.max + '</td></tr>';
    document.body.appendChild(stats_table);
}

descriptive_stats_element(values, 'descriptive_stats_selected');

descriptive_stats_element(comparedValues, 'descriptive_stats_compared');


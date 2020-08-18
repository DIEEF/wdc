(function() {
    // Crear el conector
    var myConnector = tableau.makeConnector();

    // Definir el esquema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "Indicador", dataType: tableau.dataTypeEnum.string },
            { id: "Industria", dataType: tableau.dataTypeEnum.string },
            { id: "valor", dataType: tableau.dataTypeEnum.float },
            { id: "cifras", dataType: tableau.dataTypeEnum.string },
            { id: "Subsector", dataType: tableau.dataTypeEnum.string },
            { id: "fecha", dataType: tableau.dataTypeEnum.date },
            { id: "ID", dataType: tableau.dataTypeEnum.string },
            { id: "ID2", dataType: tableau.dataTypeEnum.string },
            { id: "variacion", dataType: tableau.dataTypeEnum.float }
        ];

        var tableSchema = {
            id: "EMIM",
            alias: "Indicadores EMIM",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Descargar los datos

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://raw.githubusercontent.com/DIEEF/c-test/master/EMIM", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Indicador": feat[i].properties.Indicador[0],
                    "Industria": feat[i].properties.Industria[0],
                    "valor": feat[i].properties.valor[0],
                    "cifras": feat[i].properties.cifras[0],
                    "Subsector": feat[i].properties.Subsector[0],
                    "fecha": feat[i].properties.fecha[0],
                    "ID": feat[i].properties.ID[0],
                    "ID2": feat[i].properties.ID2[0],
                    "variacion": feat[i].properties.variacion[0]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "EMIM"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
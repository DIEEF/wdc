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
        $.getJSON("https://raw.githubusercontent.com/DIEEF/c-test/master/EMIM.json", function(resp) {
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "Indicador": resp[i].properties.Indicador,
                    "Industria": resp[i].properties.Industria,
                    "valor": resp[i].properties.valor,
                    "cifras": resp[i].properties.cifras,
                    "Subsector": resp[i].properties.Subsector,
                    "fecha": resp[i].properties.fecha,
                    "ID": resp[i].properties.ID,
                    "ID2": resp[i].properties.ID2,
                    "variacion": resp[i].properties.variacion
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
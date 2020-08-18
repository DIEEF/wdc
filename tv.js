(function() {
    // Crear el conector
    var myConnector = tableau.makeConnector();
    var num_pages = 1;

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
// Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://raw.githubusercontent.com/DIEEF/c-test/master/EMIM.json", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Indicador": feat[i].Indicador,
                    "Industria": feat[i].properties.title,
                    "valor": feat[i].properties.title,
                    "cifras": feat[i].properties.title,
                    "Subsector": feat[i].properties.title,
                    "fecha": feat[i].properties.title,
                    "ID": feat[i].properties.title,
                    "ID2": feat[i].properties.title,
                    "variacion": feat[i]..properties.title
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
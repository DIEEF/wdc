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
            { id: "fecha", dataType: tableau.dataTypeEnum.string },
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
//        $.getJSON("https://htpimages.gq/j.json", function(resp) {
		$.getJSON("https://raw.githubusercontent.com/DIEEF/c-test/master/EMIM.json", function(resp) {
            var feat = resp.data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Indicador": feat[i].Indicador,
                    "Industria": feat[i].Industria,
                    "valor": feat[i].valor,
                    "cifras": feat[i].cifras,
                    "Subsector": feat[i].Subsector,
                    "fecha": feat[i].fecha,
                    "ID": feat[i].ID,
                    "ID2": feat[i].ID2,
                    "variacion": feat[i].variacion
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
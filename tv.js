(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    var num_pages = 1;

// Direccion web - cambiar estructura
    var api_key = "8922bff85ef645a09730d7c1836c3edf",
        base_uri = "https://api.themoviedb.org/3/",
        images_uri =  "https://image.tmdb.org/t/p/w500";

    // Define the schema
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

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var i;
        var promises = [];

        for (i = 1; i < num_pages; i++) {
            promises.push(getResultsPromise(table, i));    
        }

        var promise = Promise.all(promises);

        promise.then(function(response) {
            doneCallback();
        }, function(error) {
            tableau.abortWithError(error);
        });
    };

    function getResultsPromise(table, pageNum) {
        return new Promise(function(resolve, reject) {
            var connectionUrl = "https://github.com/DIEEF/c-test/raw/master/EMIM.xlsx";
            
            var xhr = $.ajax({
                url: connectionUrl,
                dataType: 'json',
                success: function(data) {
                    var toRet = [];
                    
                    if (data.results) {
                        _.each(data.results, function(record) {               
                            entry = {
                                "poster_path": images_uri + record.poster_path,
                                "popularity": record.popularity,
                                "id": record.id,
                                "backdrop_path": images_uri + record.backdrop_path,
                                "vote_average": record.vote_average,
                                "overview": record.overview,
                                "first_air_date": record.first_air_date,
                                "origin_country": record.origin_country[0] || null,
                                "original_language": record.original_language,
                                "vote_count": record.vote_count,
                                "name": record.name,
                                "original_name": record.original_name
                            };

                            toRet.push(entry)
                        });

                        table.appendRows(toRet);
                        resolve();
                    } else {
                        Promise.reject("No results found for ticker symbol: " + ticker);
                    }
                 },
                 error: function(xhr, ajaxOptions, thrownError) {
                     Promise.reject("error connecting to the yahoo stock data source: " + thrownError);
                 }
            });
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "TVDB Data";
            tableau.submit();
        });
    });
})();

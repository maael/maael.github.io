var Github = function (options) {
	options = options || {};
	this.makeRequest = function (reqString, parameters, callback) {
		parameters = parameters || {};
		var reqURL = "https://api.github.com/",
			parameterString = (parameters==={})?"":"?";
		function isFunction(functionToCheck) {
			var getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}
		for (var prop in parameters) {
			if(parameterString.length>1){
				parameterString += "&";
			}
  			parameterString += prop + "=" + parameters[prop];
		}
		console.log(parameterString);
		$.ajax({
			url: reqURL+reqString+parameterString
		}).done(function(data) {
			if(isFunction(callback)){
				callback(data);
			}		
		});
	}
}

Github.prototype.getRepositories = function (username, callback) {
	this.makeRequest("users/"+username+"/repos", {"type":"all","sort":"created"}, callback);
}
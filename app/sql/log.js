const SqlLogs = {
  allTable: "INSERT INTO c_logs (time, device, type, project_id, log) VALUES ?",
  diyTable: "INSERT INTO c_logs_diy (time, device, type, project_id, msg) VALUES ?",
  errorTable: "INSERT INTO c_logs_error (time, device, type, project_id, msg, target, rowNum, colNum, orgMsg, hash, tag, stack) VALUES ?",
  performanceTable: "INSERT INTO c_logs_performance" +
    "(time, device, type, project_id, navigationStart, unloadEventStart, unloadEventEnd, redirectStart, redirectEnd, fetchStart, " +
    "domainLookupStart, domainLookupEnd, connectStart, connectEnd, secureConnectionStart, requestStart, responseStart, " +
    "responseEnd, domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd, domComplete, loadEventStart, loadEventEnd, " +
    "logRequestTime, logDomTime, logWhiteScreenTime, logDomReadyTime, logOnLoadTime, logFirstReadyTime, logTTI, logDurationTime, " +
    "logFetchTime, logOnRenderTime) VALUES ?"
};

module.exports = SqlLogs;

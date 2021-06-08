(function () {
  console.log("main js 加载成功");
  const ajax = (method, url) => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status.toString().startsWith("2")) {
            resolve(request.response);
          } else {
            reject();
          }
        }
      };
      request.send();
    });
  };
  getJSON.onclick = (event) => {
    event.preventDefault();
    ajax("GET", "/student.json").then(
      (data) => {
        console.log("success", data);
        const jsonData = JSON.parse(data);
        console.log("jsonData :>> ", jsonData);
        // 构建表格
        const $table = $(`<table>
                            <thead>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>座位</th>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`);
        const $tbody = $table.find("tbody");
        jsonData.forEach((item) => {
          $(
            `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.sit}</td></tr>`
          ).appendTo($tbody);
        });
        $(".student-data").append($table);
      },
      (errMsg) => {
        console.log("error", errMsg);
      }
    );
  };
})();

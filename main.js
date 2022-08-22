let data;
let current = {
    category: "",
    question: "",
    answer: "",
    value: 0,
    node: null
}
let score = 0;
const setQA = () => {
    data = getDataByShow(3613);
    let categories = new Set();
    data.forEach(item => categories.add(item["category"]));
    categories.forEach(category => {
        let associatedData = data.filter(item => item["category"] === category);
        const board = $('#board');
        const container = $(`<div id=${category} class="column"></div>`);
        container.append(`<div class="category">${category}</div>`);
        associatedData.forEach(item => {
            let value = item.value.substring(1, item.value.length);

            container.append(`<div class="choice" data-index=${data.indexOf(item)} data-value=${value} data-categeory=${item.category}>${item.value}</div>`);
        })
        board.append(container);
        $("#score").text(score);
    })
    console.log("setQA running");


}

const getDataByShow = (number) => {
    let jdata;

    $.ajax({
        url: "./jeopardy.json",
        async: false,
        dataType: 'json',
        success: function (data) {
            jdata = data;
        }
    });

    console.log(jdata);


    return jdata.filter(item => item["showNumber"] === number && item["round"] === "Jeopardy!");
}

const addListeners = () => {
    $('.choice').click(function (e) {
        current.node = this;
        console.log(current);
        const selected = data[e.target.dataset["index"]];

        $('.question').text(selected["question"])
        console.log(selected["answer"]);
        current.category = selected["category"];
        current.question = selected["question"];
        current.answer = selected["answer"];
        current.value = parseInt(e.target.dataset["value"]);
        console.log(current);
    })
    $('a').click(function () {
        // let timeout;

        if ($('#input').val() === current.answer) {
            score += current.value;
            $('#score').text(score);
            $(".message").text("Correct!");

            messageRemove();
            current.node.textContent = "";
            $(current.node).unbind("click");
            $(current.node).addClass("selected");
            console.log($(current.node)[0])
            $('#input').val("");
        } else {
            $(".message").text("Incorrect!");
            messageRemove();
        }
    })

}

function messageRemove() {
    setTimeout(removeMessage, 1000);
}

const removeMessage = () => {
    $('.message').text("");
}

setQA();
addListeners();


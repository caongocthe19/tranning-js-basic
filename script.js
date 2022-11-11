// Check radio
var get_id = (dc_id) => document.getElementById(dc_id);

var values_id = (id_name) => {
    return id_name.value;
}
// var btn_filer = get_id('btn-filter');

radio_fuc = () => {
    let married = document.querySelectorAll('.form-radio-item input');
    for (let index = 0; index < married.length; index++) {
        if (married[index].checked) {
            if (married[index].value == 'other') {
                get_id('form-group-orther').style.display = 'block';
            } else {
                get_id('form-group-orther').style.display = 'none';
                get_id('marital-oth').value = "";
            }
        }
    }
}

var createat = () => {
    let dateat = new Date();
    let day = dateat.getDate();
    let month = dateat.getMonth();
    let year = dateat.getFullYear();
    let createats = day + '/' + month + '/' + year;
    return createats;
}

onclick_check = () => {

    // remove block error text
    const remove = (sel) => document.querySelectorAll(sel).forEach(el => el.remove());
    remove('.error-text');

    // gọi các trường
    // function get document

    const parent_e = (prt_e) => prt_e.parentElement;

    // function add error
    const err_text = (elm, err_t) => {
        let span_err = document.createElement('span');
        span_err.classList.add('error-text');
        span_err.innerHTML = err_t;
        elm.appendChild(span_err);
    }

    // get id
    let first_name = get_id('first-name');
    let last_name = get_id('last-name');
    let nick_name = get_id('nick-name');
    let spouce_name = get_id('spouce-name');
    let marital_oth = get_id('marital-oth');
    let patient_age = get_id('patient-age');
    let patient_gender = get_id('patient-gender');
    let phone_no = get_id('phone-no');
    let date_t = get_id('date-t');
    let email = get_id('email');
    let radiomarried = get_id('married');
    let radiounmarried = get_id('unmarried');
    let radioother = get_id('other');
    let form_radio_married = get_id('form-radio-married');

    let result = false;


    // / Validate age
    if (values_id(patient_age) == "") {
        err_text(parent_e(patient_age), 'Trường bắt buộc');
        result = false;
        patient_age.focus();
    } else if (values_id(patient_age) < 0 || values_id(patient_age).length > 3) {
        err_text(parent_e(patient_age), 'Bạn nhập sai tuổi');
        result = false;
        patient_age.focus();
    }

    // / Validate gander
    if (values_id(patient_gender) == "") {
        err_text(parent_e(patient_gender), 'Trường bắt buộc');
        result = false;
        patient_gender.focus();
    }

    // / Validate phone
    const tel_check = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (values_id(phone_no) == "") {
        err_text(parent_e(phone_no), 'Trường bắt buộc');
        result = false;
        phone_no.focus();
    } else if (!tel_check.test(values_id(phone_no))) {
        err_text(parent_e(phone_no), 'Bạn nhập sai định dạng số điện thoại');
        result = false;
        phone_no.focus();
    }

    // / Validate email
    const email_check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (values_id(email) == "") {
        err_text(parent_e(email), 'Trường bắt buộc');
        result = false;
        email.focus();
    } else if (!email_check.test(values_id(email))) {
        err_text(parent_e(email), 'Email sai định dạng');
        result = false;
        email.focus();
    }

    //  Validate radio marital
    if (!radiomarried.checked && !radioother.checked && !radiounmarried.checked) {
        err_text(parent_e(form_radio_married), 'Trường bắt buộc');
    }
    if (radioother.checked) {
        const fg_orther = document.querySelector('#form-group-orther input');
        if (values_id(fg_orther) == "") {
            err_text(parent_e(fg_orther), 'Trường bắt buộc');
        }
    }

    //  Validate radio time

    if (values_id(date_t) == "") {
        err_text(parent_e(date_t), 'Trường bắt buộc');
    }

    // Check result get data
    let class_error = document.getElementsByClassName('error-text');
    //let day=(class_error);
    if (class_error.length == 0) {
        var married = document.querySelectorAll('.form-radio-item input');
        for (var s = 0; s < married.length; s++) {
            if (married[s].checked) {
                var mar = values_id(married[s]);
            }
        }

        let dataform = {
            firstname: values_id(first_name),
            lastname: values_id(last_name),
            patientage: values_id(patient_age),
            nickname: values_id(nick_name),
            patientgender: values_id(patient_gender),
            phoneno: values_id(phone_no),
            spoucename: values_id(spouce_name),
            email: values_id(email),
            date: values_id(date_t),
            maritalstatusorther: values_id(marital_oth),
            maritalstatus: mar,
            crateat: createat(),
        }
        createUser(dataform);

    }

    return result;

}
var api_t = 'https://635a84ff38725a1746c8a0bf.mockapi.io/js/userbt';

// var filters = (data) => {
//     data.filter((datas) => {
//         return datas.patientage > 22;
//     })
// }

// var filter_func = (user) => {
//     return user.patientage > 22;
// }

var getUser = async () => {
    const data = await fetch(api_t)
        .then((response) => response.json())
    showData(data);
}

getUser();

var showData = (user) => {
    let result_kq = document.getElementById('result-kq_bd');
    // let data = user.filter(filter_func);
    let get = user.map((data) => {
        return `<tr>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.patientage}</td>
        <td>${data.nickname}</td>
        <td>${data.patientgender}</td>
        <td>${data.phoneno}</td>
        <td>${data.spoucename}</td>
        <td>${data.maritalstatus}</td>
        <td>${data.maritalstatusorther}</td>
        <td>${data.date}</td>
        <td>${data.email.toLowerCase()}</td>
        <td>${data.crateat}</td>
        <td><button id="${data.id}" onclick="delete_func(this.id)">delete</button></td>
        </tr>`
    });
    result_kq.innerHTML = get.join('');
}

var createUser = async (data) => {
    await fetch(api_t, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    getUser();
}

var delete_func = async (id) => {
    // console.log(id);
    let id_de = api_t + '/' + id;
    await fetch(id_de, {
        method: 'DELETE',
    });
    getUser();
}

const filter_click = async () => {
    const data = await fetch(api_t)
        .then((response) => response.json())
    const fil = await data.filter(data => data.patientage > 22);

    showData(fil);
}
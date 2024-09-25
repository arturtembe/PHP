
const host = `https://my-mongodb-617s.onrender.com/mongodb/agenda`;

const endpoint={
    login: `${host}/login`,
    register: `${host}/register`,
    otpCreate: `${host}/otp`,
    otpVerify: `${host}/update/status/otp`,
    otpEmail: `${host}/otp/email`,
    tarefaAdd: `${host}/tarefa/create`,
    tarefaEdit: `${host}/tarefa/update`,
    tarefaView: `${host}/tarefa/view`,
    tarefaDelete: `${host}/tarefa/delete`,
}

export default endpoint;
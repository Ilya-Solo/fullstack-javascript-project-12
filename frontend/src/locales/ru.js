export default {
  translation: {
    formCommonFields: {
      password: "Пароль",
      rename: "Переименовать",
      cancel: "Отменить",
      delete: "Удалить",
      send: "Отправить",
    },
    login: {
      username: "Ваш ник",
      enter: "Войти",
      exit: "Выйти",
      errors: {
        wrongLoginOrPasswordError: "Неверные имя пользователя или пароль",
      },
    },
    signUp: {
      title: "Регистрация",
      username: "Имя пользователя",
      confirmPassword: "Подтвердите пароль",
      accountAbscent: "Нет аккаунта?",
      register: "Зарегистрироваться",
      errors: {
        requiredField: "Обязательное поле",
        wrongUsernameSize: "От 3 до 20 символов",
        shortPassword: "Не менее 6 символов",
        passwordNotEqual: "Пароли должны совпадать",
        alreadyExistingUser: "Пользователь уже существует",
        defaultError: "Произошла ошибка. Попробуйте снова.",
      },
    },
    messages: {
      messageCounter: "{{count}} сообщение",
      messageCounter_few: "{{count}} сообщения",
      messageCounter_many: "{{count}} сообщений",
      messageCounter_other: "{{count}} сообщений",
      newMessage: "Новое сообщение",
      enterMessage: "Введите сообщение...",
    },
    channels: {
      title: "Каналы",
      control: "Управление каналом",
      addChannelForm: {
        title: "Добавить канал",
        channelName: "Имя канала",
        errors: {
          channelNameRequired: "Имя канала обязательно",
          wrongUsernameSize: "От 3 до 20 символов",
          mustBeUniq: "Должно быть уникальным",
        },
      },
      removeChannel: {
        title: "Удалить канал",
        enshuranceQuestion: "Уверены?",
      },
      renameChannel: {
        title: "Переименовать канал",
        errors: {
          channelNameRequired: "Имя канала обязательно",
          wrongUsernameSize: "От 3 до 20 символов",
          mustBeUniq: "Должно быть уникальным",
        },
      },
    },
    notifications: {
      renameChannel: "Канал переименован",
      addChannel: "Канал создан",
      removeChannel: "Канал удален",
    },
  },
};

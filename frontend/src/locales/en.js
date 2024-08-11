export default {
  translation: {
    formCommonFields: {
      password: "Password",
      rename: "Rename",
      cancel: "Cancel",
      delete: "Delete",
      send: "Send",
    },
    login: {
      username: "Your username",
      enter: "Login",
      exit: "Logout",
      errors: {
        wrongLoginOrPasswordError: "Incorrect username or password",
      },
    },
    signUp: {
      title: "Sign Up",
      username: "Username",
      confirmPassword: "Confirm password",
      accountAbscent: "Don't have an account?",
      register: "Register",
      errors: {
        requiredField: "This field is required",
        wrongUsernameSize: "Must be between 3 and 20 characters",
        shortPassword: "At least 6 characters",
        passwordNotEqual: "Passwords must match",
        alreadyExistingUser: "User already exists",
        defaultError: "An error occurred. Please try again.",
      },
    },
    messages: {
      messageCounter: "{{count}} message",
      messageCounter_few: "{{count}} messages",
      messageCounter_many: "{{count}} messages",
      messageCounter_other: "{{count}} messages",
      newMessage: "New message",
      enterMessage: "Enter your message...",
    },
    channels: {
      title: "Channels",
      control: "Channel control",
      addChannelForm: {
        title: "Add channel",
        channelName: "Channel name",
        errors: {
          channelNameRequired: "Channel name is required",
          wrongUsernameSize: "Must be between 3 and 20 characters",
          mustBeUniq: "Must be unique",
        },
      },
      removeChannel: {
        title: "Remove channel",
        enshuranceQuestion: "Are you sure?",
      },
      renameChannel: {
        title: "Rename channel",
        errors: {
          channelNameRequired: "Channel name is required",
          wrongUsernameSize: "Must be between 3 and 20 characters",
          mustBeUniq: "Must be unique",
        },
      },
    },
  },
};

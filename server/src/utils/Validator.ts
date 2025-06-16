import PasswordValidator from 'password-validator';

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

export default passwordSchema;

import md5 from 'md5';
import dotenv from 'dotenv';

const { SALT } = dotenv.config().parsed;

export default pass => md5(pass + SALT);

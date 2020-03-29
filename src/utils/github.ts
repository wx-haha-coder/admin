import querystring from 'querystring';

const authBaseUrl = 'https://github.com/login/oauth/authorize';

export const getGithubUrl = (optoins: any = {}) => {
  return `${authBaseUrl}? ${querystring.stringify(optoins)}`;
};

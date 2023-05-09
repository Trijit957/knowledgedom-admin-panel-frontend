const apiDomainPathObj = {
  local: 'http://localhost:5555',
  staging: 'https://staging-knowledgedom.cyclic.app'
}

export const environment = {
  production: true,
  apiDomainPath: apiDomainPathObj.staging
};

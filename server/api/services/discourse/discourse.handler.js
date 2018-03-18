import Rx from 'rx';

/* 
   * r represents response of the Watson, here is where the magic happens.
   * nodemon index.js automatically restarts the server after a modification in the source code.
*/

export default function discourseHandler(r) {
  const accountsEntity = r.entities.find(e => e.entity === 'account');
  
  if (accountsEntity) {
    r.context.accounts = accountsEntity.value;
  }
  
  if (r.intents.length === 0) {
    return Rx.Observable.just(r);
  }
  
  const accounts  = r.context.accounts;

  switch (r.intents[0].intent) {
    case 'menu':
      if (accounts) {
        r.output.accounts = accounts
      }
      return Rx.Observable.just(r);

    default:
      return Rx.Observable.just(r);
  }
}

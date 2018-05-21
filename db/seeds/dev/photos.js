exports.seed = function(knex, Promise) {
  return knex('photos').del()
    .then(() => {
      return knex('photos').insert([
        {
          title: 'Chimis',
          photo_url: 'https://cdn3.tmbi.com/secure/RMS/attachments/37/300x300/Beef-Chimichangas_exps8535_MB2751679C04_09_1b_RMS.jpg'
        }
      ]);
    })
    .catch(error => {
      console.log(`Error seeding data: ${error}`)
    })
};

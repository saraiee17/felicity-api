/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { 
      id: 1, 
      first_name: 'Root',
      last_name: 'RootRoot',
      email: 'rootroot@yahoo.com',
      password: 'password'
    }
  ]);
};

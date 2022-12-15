/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('emotions').del()
  await knex('emotions').insert([
  {
    id: 1, 
    emotion: 'angry',
    user_id: '1'
  }
  ]);
};

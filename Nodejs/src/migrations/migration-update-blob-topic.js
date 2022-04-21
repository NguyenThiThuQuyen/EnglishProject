module.exports = {
    up: async (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Topics','topicImage',
              {
                  type: Sequelize.BLOB('long'),
                  allowNull: true
              }), 
          ])
      },
    down: async (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Topics','topicImage',
              {
                  type: Sequelize.STRING,
                  allowNull: true,
              }) 
          ])
      }
    }
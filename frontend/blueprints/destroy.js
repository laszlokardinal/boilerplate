const generator = process.argv[2];
const args = process.argv.slice(3);

const { destroy } = require(`./generators/${generator}.js`);

destroy
  .apply(null, args)
  .then(
    () => console.log(`Successfully destroyed ${args[0]} ${generator}`),
    (error) =>
      console.log(
        `An error occurred while destroying ${args[0]} ${generator}:`,
        error
      )
  );

const generator = process.argv[2];
const args = process.argv.slice(3);

const { generate } = require(`./generators/${generator}.js`);

generate
  .apply(null, args)
  .then(
    () => console.log(`Successfully generated ${args[0]} ${generator}`),
    (error) =>
      console.log(
        `An error occurred while generating ${args[0]} ${generator}:`,
        error
      )
  );

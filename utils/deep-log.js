import util from "util";
export const deepLog = (content) => {
  console.log(util.inspect(content, { depth: null, colors: true }));
};

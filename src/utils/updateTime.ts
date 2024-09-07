export const updateTime = () => {
  let time = new Date();

  let hour: string = String(time.getHours()).padStart(2, "0");
  let minute: string = String(time.getMinutes()).padStart(2, "0");
  let second: string = String(time.getSeconds()).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
};

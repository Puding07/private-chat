import CryptoJS, { enc, AES, HmacSHA1, PBKDF2 } from "crypto-js";
import NoPadding from "crypto-js/pad-nopadding";
import CFB from "crypto-js/mode-cfb";

export const Encrypt = (secret, id, value) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const iv = CryptoJS.lib.WordArray.random(16);

  const key = PBKDF2(secret, salt, {
    keySize: 256 / 32,
  });

  const message = JSON.stringify({ id, time: new Date(), value });

  const encrypted = AES.encrypt(message, key, {
    iv: iv,
    mode: CFB,
    padding: NoPadding,
  });

  const integrity = HmacSHA1(encrypted.toString(), key);

  return {
    room: secret,
    value: {
      cipher: encrypted.toString(),
      iv: iv.toString(),
      salt: salt.toString(),
    },
    integrity: integrity.toString(),
  };
};

export const Decrypt = (secret, message) => {
  var key = PBKDF2(secret, enc.Hex.parse(message.value.salt), {
    keySize: 256 / 32,
  });

  const integrityCheck = HmacSHA1(message.value.cipher, key);

  console.log(message.value);
  if (message.integrity === integrityCheck.toString()) {
    var decrypted = AES.decrypt(message.value.cipher, key, {
      iv: enc.Hex.parse(message.value.iv),
      mode: CFB,
      padding: NoPadding,
    });

    console.log(decrypted.toString(enc.Utf8));

    return JSON.parse(decrypted.toString(enc.Utf8));
  } else {
    return "Not good";
  }
};

function ansHash(str) {
    var d = 0;
    for (let i = 0; i < str.length; i++) {
        d += parseInt(str[i]);
    }
    d += parseInt(str[0]);
    d += parseInt(str[str.length-2]);
    d += encrypt(parseInt(str));
    if (d > 674361)
        return (d - 78763).toString();
    return d.toString();

}
/*
 * NOTE: To have this script running without errors, C# 8.0 is required.
 *
 * You can also use this website: https://dotnetfiddle.net/.
 */
 
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json; // NOTE: You need to install this library from NuGet, otherwise code below may NOT WORK.
 
 
public class Program
{
    private static byte[] _gZipCompressedString =
        Convert.FromBase64String("H4sIAAAAAAAA/1WOzQrCMBCEXynpj+CxJlIW3A3FRum1KiEJ6KFI0zy9CaWit93Z2W/msUBAATsQ" +
                                 "sGDEAuxswKUpaqtsY9EhxwWmdOfkTKnOm9fMq9dUFIca7ab7r67k8OP3bNWbGdzLjM/LNIq86wLTv5JH" +
                                 "lvgMZc49vO/XMJ1EY6kfIjlfYd8VSnaBMq+t+djOuVOFEljqUpLTHF0X/tk+ddMFSZMYukZ3YxShJrEx" +
                                 "wv4Dldqe4gABAAA=");
 
    private static readonly string DecompressedString = Decompress(_gZipCompressedString);
    private static readonly string Base64DecodedString = Base64Decode(DecompressedString);
 
    private static string Base64Decode(string base64String) =>
        Encoding.UTF8.GetString(Convert.FromBase64String(base64String));
 
    private static string Decompress(byte[] gzip)
    {
        using (GZipStream stream = new GZipStream(new MemoryStream(gzip),
            CompressionMode.Decompress))
        {
            const int size = 4096;
            byte[] buffer = new byte[size];
            using (MemoryStream memory = new MemoryStream())
            {
                int count = 0;
                do
                {
                    count = stream.Read(buffer, 0, size);
                    if (count > 0)
                    {
                        memory.Write(buffer, 0, count);
                    }
                } while (count > 0);
                return Encoding.UTF8.GetString(memory.ToArray());
            }
        }
    }
   
    static object CheckType(Type type, object obj)
    {
        if (!(obj.GetType() == type))
            throw new ArgumentException($"Excepted type {type}, got {obj.GetType()} instead.");
        return obj;
    }
 
    public class LockSolver
    {
        private static List<string> TestAnswers;
        private static Func<string, string> Function;
        private static Dictionary<string, string>? TestCaseDictionary;
 
        public LockSolver()
        {
            TestAnswers = new List<string>();
            TestCaseDictionary = JsonSerializer.Deserialize<Dictionary<string, string>>(Base64DecodedString);
        }
 
        public void Run(Func<string, string> function)
        {
            Function = function;
            var sampleTest = Function("12345");
 
            if (CheckType(typeof(string), sampleTest).ToString() != "2353")
                throw new Exception($"Your Solve() method returned {sampleTest} instead of '2353'.");
           
            int keyNumber = 1;
            foreach (KeyValuePair<string, string> keyValuePair in TestCaseDictionary)
            {
                string functionResult = Function(keyValuePair.Key);
 
                if (TestCaseDictionary[keyValuePair.Key] != null &&
                    functionResult != TestCaseDictionary[keyValuePair.Key])
                {
                    throw new Exception($"Failed to open lock #{keyNumber}, your solution is probably wrong " +
                                        $"- please make sure that your Solve() method is correct.");
                }
                keyNumber++;
                TestAnswers.Add(functionResult);
            }
        }
 
        public string GetPassword(string userID)
        {
			string answer = String.Join("", TestAnswers) +
				Function(CheckType(typeof(string), userID).ToString());
            byte[] answerInBytes = Encoding.UTF8.GetBytes(answer);
            SHA1 sha1 = new SHA1CryptoServiceProvider();
 
            static string HexStringFromBytes(byte[] bytes)
            {
                var sb = new StringBuilder();
                foreach (byte b in bytes)
                {
                    var hex = b.ToString("x2");
                    sb.Append(hex);
                }
                return sb.ToString();
            }
            return (HexStringFromBytes(sha1.ComputeHash(answerInBytes)));
        }
    }
   
    public static long Encrypt(long number) =>
        Convert.ToInt64(CheckType(typeof(long), number)) >> 23 ^ 2333;
   
    static string Solve(string token)
    {
        // Complete this method.
        // REMEMBER! You need C# 8.0 to have this script running without errors.
        // You also need to install System.Text.Json from NuGet to have this script running without errors as well.
    }
   
    public static void Main(string[] args)
    {
        // Complete this method.
    }
}

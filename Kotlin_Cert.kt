import java.io.ByteArrayInputStream
import java.io.ObjectInputStream
import java.security.MessageDigest
import java.util.Base64
import java.util.zip.GZIPInputStream
import kotlin.text.Charsets.UTF_8

fun encrypt(number: Long) = number shr 23 xor 2333

fun decompress(compressed: ByteArray) =
    GZIPInputStream(compressed.inputStream(), 4096).bufferedReader(UTF_8).use { it.readText() }

fun decode(encoded: String): ByteArray = Base64.getDecoder().decode(encoded)

@Suppress("UNCHECKED_CAST")
fun deserialize(src: ByteArray) =
    ObjectInputStream(ByteArrayInputStream(src)).readObject() as Array<Pair<String, String?>>

const val compressedString =
        "H4sIAAAAAAAAAFWPy3LDIAxFPygbjO1FF10I4xq7FdQzJDHeNSTFdR7T9JEQvr4kk4XLjAYJXR1dvhQB" +
        "1i0uAPlKVz+ndeU/Vx95a5a7i6Kz/onBEl9tBQ5gI+B6nm1aQ0H/a2fDd+V0ehhTVwA0CLDYv3VNWIsW" +
        "yq0/mq4fXqgfVnt70rQ59ktJFDkDO8idoQ+/vSjh3QHfCEYAao9xjvE6YOiDbdksMuN7S+VokjVAiSNS" +
        "JaQHkQEcolabRHGb33sZdpPe6HLUSNSdKcMwYZpc8TZT+sa/YNh6m968FJFVIGfnSS1Rl0HxOVF8S2Ke" +
        "SMEmLJLIqy/tvOQmk7xM7MQj13OK4bqvJHJ0BPliytZSGxLDY5jHuw2o4/81etnB4x91Gj/NqAEAAA=="

class LockSolver {
    private val testAns = StringBuilder()
    private lateinit var _function: (String) -> String
    private var testCases: Array<Pair<String, String?>> =
        deserialize(decode(decompress(decode(compressedString))))

    fun run(function: (String) -> String) {
        _function = function
        val sampleTest = _function("12345")

        if (sampleTest != "2353")
            throw Exception("Your solve() method returned $sampleTest instead of '2353'")
        var lockNumber = 1
        for (item in testCases) {
            val functionResult = _function(item.first)
            testAns.append(
                if (item.second?.equals(functionResult) != false)
                    functionResult
                else
                    throw Exception(
                            "Failed to open lock $lockNumber, your solution may be wrong - " +
                            "please make sure your solve() method is correct."
                    )
            )
            lockNumber++
        }
    }

    fun getPassword(key: String) = MessageDigest.getInstance("SHA-1")
        .digest(testAns.toString().plus(_function(key)).toByteArray())
        .fold("", { str, it -> str + "%02x".format(it) })
}

fun solve(token: String): String {
    // complete this method

    return ""
}

fun main() {
    // complete this method
}
# Input: word1 = "abc", word2 = "pqr"
# Output: "apbqcr"
# Explanation: The merged string will be merged as so:
# word1:  a   b   c
# word2:    p   q   r
# merged: a p b q c r

word1 = 'abc'
word2 = 'pqr'

# word2 = " " + word2[0:]

# new_str1 = ' '.join(word1)
# new_str2 = ' '.join(word2)

min_l = min(len(word1), len(word2))

new_str = ''

for i in range(min_l):
    new_str += word1[i] + word2[i] # adding by character

new_str += word1[min_l:] + word2[min_l:] # remaining part (if any)

print(new_str) 
# print(new_str1) => a b c
# print(new_str2) => p q r



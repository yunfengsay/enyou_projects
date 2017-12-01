import whois
import thread
import time

letters  = "abcdefghijklmnopqrstuvwxyz"
words = list(letters)
print(words)
for i in words:
    for k in words:
        for b in words:
            word = i+k +b
            domin = word+ ".com"
            w = whois.whois(domin)
            if w.expiration_date is None:
                print("🍌 --->  ", domin)
            else:
                print("😭  没找到 --->   ", domin)
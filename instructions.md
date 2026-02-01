

# 🏋️ Gym App — Git / GitHub / Vercel Guide  

*(Testing & Production)*

Αυτός είναι ένας **σύντομος και πρακτικός οδηγός** για το πώς δουλεύουμε με:

- **Git**
- **GitHub**
- **Vercel**
- **2 περιβάλλοντα**: Testing & Production

---

##  Βασική ιδέα

- **`main`** → **Production** (LIVE στο internet)

- **`develop`** → **Testing** (Preview στο internet)

Κάθε `git push` ➜ κάνει **deploy στη Vercel**  

Κάθε deploy ➜ εμφανίζεται σαν **νέα γραμμή** στο **Vercel → Deployments**

---

##  Πού κάνω τι

-  Δοκιμές & ανάπτυξη → **`develop`**

-  Live site → **`main`**

---

## Αρχικό setup (μία φορά)

### 1.1 Σωστό folder

Βεβαιώσου ότι είσαι στον φάκελο που έχει `package.json`:

```bash
pwd
ls
```

### 1.2 `.gitignore`

Να ΜΗΝ ανεβαίνουν άχρηστα αρχεία:

```gitignore
node_modules
.next
.env.local
.env.*.local
.DS_Store
```

### 1.3 Πρώτο commit

```bash
git add .
git commit -m "Initial commit"
```

### 1.4 Έλεγχος GitHub remote

```bash
git remote -v
```

## Δημιουργία Testing branch (`develop`) — μία φορά

```bash
git checkout -b develop
git push -u origin develop
```

---

## Καθημερινή δουλειά — TESTING (`develop`)

### Βήματα

```bash
git checkout develop
# κάνω αλλαγές στον κώδικα
git add .
git commit -m "Περιγραφή αλλαγής"
git push
```

### Αποτέλεσμα

- Vercel → **Deployments**

- Νέα γραμμή: **Preview / develop**

- Το **Visit** είναι το **TESTING link**

---

## Πέρασμα σε PRODUCTION (`main`)

Όταν το testing είναι ΟΚ:
```bash
git checkout main
git merge develop
git push
```

### Αποτέλεσμα

- Νέα γραμμή: **Production / main (Current)**

- Το **Visit** είναι το **LIVE site**


## Γρήγορος έλεγχος branch

```bash
git branch --show-current
```

## Πρόβλημα: `403 Permission denied`

Συνήθως λάθος GitHub login στο μηχάνημα.

### Λύση (Mac):

```bash
brew install gh
gh auth login
```

Μετά:
```bash
git push
```

## ⚡ Cheatsheet

### 🧪 Testing
```bash
git checkout develop
git add .
git commit -m "..."
git push
```

### 🚀 Production
```bash
git checkout main
git merge develop
git push
```

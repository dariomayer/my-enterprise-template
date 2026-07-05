# git_auto.sh
#!/bin/bash
# Script automatizzato per gestire il push sui branch develop e main

# Colori per il terminale
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Tipi di commit (Conventional Commits) e descrizione
# Nota: su macOS /bin/bash è spesso 3.x, quindi evito associative arrays e commenti inline.
TYPES=(
  "feat"
  "fix"
  "docs"
  "style"
  "refactor"
  "perf"
  "test"
  "build"
  "ci"
  "chore"
  "revert"
)
DESCS=(
  "Aggiunta di una nuova funzionalità"
  "Correzione di un bug"
  "Aggiornamenti di sola documentazione"
  "Modifiche di stile/formattazione (niente logica)"
  "Rifattorizzazioni (nessuna feature/fix)"
  "Ottimizzazioni di performance"
  "Aggiunta/Aggiornamento test"
  "Build, packaging, dipendenze"
  "Configurazione/Script CI"
  "Chore e manutenzione"
  "Revert di un commit"
)

print_commit_types_menu() {
  printf "%b\n" "${BLUE}Seleziona il tipo di commit:${NC}" >&2
  local i
  for (( i=0; i<${#TYPES[@]}; i++ )); do
    printf "  %2d) %-8s - %s\n" "$((i+1))" "${TYPES[$i]}" "${DESCS[$i]}" >&2
  done
}

select_commit_type() {
  local choice
  while true; do
    print_commit_types_menu
    read -p "Inserisci il numero del tipo (default: chore): " choice </dev/tty
    if [ -z "$choice" ]; then
      echo "chore"
      return 0
    fi
    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le ${#TYPES[@]} ]; then
      echo "${TYPES[$((choice-1))]}"
      return 0
    else
      printf "%b\n" "${YELLOW}Scelta non valida. Riprova.${NC}" >&2
    fi
  done
}

# Funzione per elencare i branch disponibili
list_branches() {
    printf "%b\n" "${BLUE}Branch disponibili:${NC}"
    git branch | grep -v "^*" | sed 's/^[ \t]*//'
    printf "%b\n" "${BLUE}Branch attuale:${NC}"
    git branch | grep "^*" | sed 's/^* //'
    printf "\n"
}

# Elenca i branch disponibili
list_branches

# Selezione del tipo di commit e messaggio
commit_type=$(select_commit_type)
printf "%b\n" "Selezionato tipo: ${BLUE}${commit_type}${NC}"
read -p "Inserisci il messaggio di commit: " commit_msg
final_commit_msg="${commit_type}: ${commit_msg}"

# Aggiunge e committa i file modificati
git add -A
if ! git commit -m "$final_commit_msg"; then
    printf "%b\n" "${YELLOW}Nessuna modifica da committare o commit fallito.${NC}"
    exit 1
fi

# Chiede all'utente su quale branch pushare
printf "%b\n" "${YELLOW}Su quale branch vuoi pushare? (default: develop)${NC}"
read branch_to_push

# Se non viene specificato un branch, usa develop
if [ -z "$branch_to_push" ]; then
    branch_to_push="develop"
fi

# Controllo se il branch esiste
if ! git show-ref --verify --quiet refs/heads/$branch_to_push; then
    printf "%b\n" "${YELLOW}Il branch $branch_to_push non esiste. Vuoi crearlo? (y/n)${NC}"
    read create_branch
    if [ "$create_branch" == "y" ]; then
        git checkout -b $branch_to_push
    else
        printf "%b\n" "${YELLOW}Operazione annullata${NC}"
        exit 1
    fi
else
    # Checkout sul branch selezionato
    git checkout $branch_to_push
fi

# Push sul branch selezionato
git push origin $branch_to_push

printf "%b\n" "${GREEN}✔️ Push completato su $branch_to_push!${NC}"

# Chiede se si vuole fare il push anche su main
read -p "Vuoi continuare con il merge e il push su main? (y/n): " continue_main


if [ "$continue_main" == "y" ]; then
    # Esegue le operazioni su main
    git checkout main
    git merge $branch_to_push
    
    printf "%b\n" "${YELLOW}Stai per eseguire un push sul branch main. Sei sicuro? (y/n)${NC}"
    read confirm_main_push
    
    if [ "$confirm_main_push" == "y" ]; then
        git push origin main
        printf "%b\n" "${GREEN}✔️ Push su main completato!${NC}"
    else
        printf "%b\n" "${GREEN}Push su main annullato.${NC}"
    fi
else
    printf "%b\n" "${GREEN}✔️ Processo completato, push su main saltato.${NC}"
fi

# Ritorna al branch originale
git checkout $branch_to_push

printf "%b\n" "${GREEN}✔️ Operazioni completate!${NC}"
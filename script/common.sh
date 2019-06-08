function exportContent {
    for i in $@
    do
        export "$i"
    done
}
function createENV {
    for i in $@
    do
        echo "$i" >> .env
    done
}

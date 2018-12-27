include config.mk

## help:		    	List command
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//';

## npm-install

## rsync-player:		Sync local player
sync-player:
	rsync -axv --exclude package-lock.json \
	--exclude .idea \
	--exclude node_modules \
	--exclude .git \
	--exclude test \
	--exclude .nyc_output \
	--exclude Makefile \
	--exclude .gitignore \
	--exclude config.mk \
	--exclude config.mk.dist \
	${DIR_FROM} ${DIR_TO};
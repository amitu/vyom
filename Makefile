.DEFAULT_GOAL := help

export PYTHONPATH=$PYTHONPATH:.
rapydscript=./node_modules/rapydscript-ng/bin/rapydscript
babel=./node_modules/.bin/babel --plugins transform-react-jsx

node_modules: ## Install dependencies.
node_modules: package.json
	npm install

test/test.js: ## Main test file
test/test.js: tsrc/main.pyj vyom/*/*.pyj tsrc/components.jsx node_modules
	${rapydscript} compile --import-path . --bare $< --output test/t.js
	${babel} tsrc/components.jsx > test/c.js
	cat vendor/{jquery-2.2.2.min.js,react.js,react.dom.js} test/{c,t}.js > $@
	rm test/{c,t}.js

MyTODO/index.osx.js: tsrc/main.pyj MyTODO/index.osx_init.js vyom/*.pyj tsrc/* node_modules
	${rapydscript} compile --import-path . --bare $< --output t.js
	${babel} tsrc/components.jsx > c.js
	cat {c,t}.js MyTODO/index.osx_init.js > $@
	rm {c,t}.js

TodoMVC/todo.js: TodoMVC/todo.pyj TodoMVC/components.jsx vyom/*.pyj
	${rapydscript} compile --import-path . --bare TodoMVC/todo.pyj --output t.js
	${babel} TodoMVC/components.jsx > c.js
	cat vendor/{jquery-2.2.2.min.js,react.js,react.dom.js} {c,t}.js > TodoMVC/todo.js
	rm {c,t}.js

clean:
	-rm test/test.js
	-rm MyTODO/index.osx.js
	-rm TodoMVC/todo.js

help:  ## Show this help.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-15s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done


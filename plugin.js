/*
 * Image64embed Plugin for CKEditor (http://github.com/nmmf/image64embed)
 * Created by ALL-INKL.COM - Neue Medien M�nnich - 04. Feb 2014
 * Licensed under the terms of GPL, LGPL and MPL licenses.
 */
CKEDITOR.plugins.add("image64embed", {
	lang 	: 	["af","ar","bg","bn","bs","ca","cs","cy","da","de","de-ch","el","en","en-au","en-ca","en-gb","eo","es","et","eu","fa","fi","fo","fr","fr-ca","gl","gu","he","hi","hr","hu","id","is","it","ja","ka","km","ko","ku","lt","lv","mk","mn","ms","nb","nl","no","pl","pt","pt-br","ro","ru","si","sk","sl","sq","sr","sr-latn","sv","th","tr","ug","uk","vi","zh","zh-cn"],
	requires: 	"dialog",
	icons	:	"image64embed",
	hidpi	:	true,
    init	: 	function(editor){
					var pluginName = 'image64embedDialog';
					
					editor.ui.addButton("image64embed", {
						label: editor.lang.common.image,
						command: pluginName,
						toolbar: "insert"
					});
					CKEDITOR.dialog.add(pluginName, this.path+"dialogs/image64embed.js");
					
					var allowed = 'img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}',
						required = 'img[alt,src]';
					
					editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
						allowedContent: allowed,
						requiredContent: required,
						contentTransformations: [
							[ 'img{width}: sizeToStyle', 'img[width]: sizeToAttribute' ],
							[ 'img{float}: alignmentToStyle', 'img[align]: alignmentToAttribute' ]
						]
					} ) );
					editor.on("doubleclick", function(evt){
						if(evt.data.element && !evt.data.element.isReadOnly() && evt.data.element.getName() === "img") {
							evt.data.dialog = pluginName;
							editor.getSelection().selectElement(evt.data.element);
						}
					});
					if(editor.addMenuItem) {
						editor.addMenuGroup("image64embedGroup");
						editor.addMenuItem("image64embedItem", {
							label: editor.lang.common.image,
							icon: this.path+"icons/image64embed.png",
							command: pluginName,
							group: "image64embedGroup"
						});
					}
					if(editor.contextMenu) {
						editor.contextMenu.addListener(function(element, selection) {
							if(element && element.getName() === "img") {
								editor.getSelection().selectElement(element);
								return { image64embedItem: CKEDITOR.TRISTATE_ON };
							}
							return null;
						});
					}
				}
});

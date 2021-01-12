Object.assign(window.search, {"doc_urls":["1_trait_type/index.html#trait과-type","1_trait_type/1_trait_with_type.html#trait과-type을-함께-사용하는-방법들","1_trait_type/1_trait_with_type.html#type-키워드","1_trait_type/1_trait_with_type.html#타입-별칭type-alias-작성-기본-기능","1_trait_type/1_trait_with_type.html#연관-타입associated-type-작성-응용-기능","1_trait_type/1_trait_with_type.html#컴파일러는-어떻게-구분할까","1_trait_type/1_trait_with_type.html#왜-이렇게-개념이-복잡한가"],"index":{"documentStore":{"docInfo":{"0":{"body":0,"breadcrumbs":2,"title":2},"1":{"body":0,"breadcrumbs":4,"title":2},"2":{"body":9,"breadcrumbs":3,"title":1},"3":{"body":35,"breadcrumbs":4,"title":2},"4":{"body":40,"breadcrumbs":4,"title":2},"5":{"body":119,"breadcrumbs":2,"title":0},"6":{"body":11,"breadcrumbs":2,"title":0}},"docs":{"0":{"body":"","breadcrumbs":"Trait과 Type","id":"0","title":"Trait과 Type"},"1":{"body":"","breadcrumbs":"trait과 type » Trait과 Type을 함께 사용하는 방법들","id":"1","title":"Trait과 Type을 함께 사용하는 방법들"},"2":{"body":"두 가지 경우에 사용됩니다. 원래는 타입 별칭(type alias)을 달기 위해서 있는 건데 '연관 타입(associaed type)' 구현에도 사용합니다. 우리가 보기에는 똑같은 문법인데 컴파일러는 다르게 처리하는 겁니다.(swift 같은 언어에는 AssociatedType같은 키워드가 따로 있습니다. swift 2.2 이전에는 문법의 모양을 더 중요시했는지 typealias 키워드였습니다만...) 이번 장에서는 두 가지 사용처를 먼저 보고 왜 그렇게 사용하는지 생각해보겠습니다.","breadcrumbs":"trait과 type » type 키워드","id":"2","title":"type 키워드"},"3":{"body":"타입 별칭이란 어떠한 타입을 정의하고 거기에 이름을 붙이는 것입니다. 즉 두 개는 서로 동치입니다. 길고 복잡한 타입을 쓸 때 별칭으로 정의해서 짧게 쓰는 것이 일차 목적 그러면서도 원래 타입에서 사용할 수 있는 기능을 그대로 사용 가능 fn main() {\n// 이렇게 타입 별칭을 정의하면\ntype Kilometers = i32;\n// 이렇게 우변 대신 별칭인 좌변을 타입으로 적을 수 있음.\n// 포함관계가 아니라 Kilomters와 i32는 같은 타입.\nlet y: Kilometers = 5;\nlet x: i32 = 5;\n// 같은 타입이니까 연산도 가능.\nprintln!(\"x + y = {}\", x + y); // 당연히 더 복잡한 타입에도 별칭을 붙일 수 있으며 이게 이 기능이 있는 이유\ntype Thunk = Box<dyn Fn() + Send + 'static>;\nfn takes_long_type(f: Thunk) { // --snip--\n}\n} 어디서 활용되고 있냐하면 바로 io::Result입니다. Result = Result<T, std::io::Error>; 그래서 io::Result 타입을 사용하면 Result의 에러 타입을 정의할 필요가 없습니다. io::Error로 지정되어 있는 Result 타입의 별칭이니까요.","breadcrumbs":"trait과 type » 타입 별칭(type alias) 작성: 기본 기능","id":"3","title":"타입 별칭(type alias) 작성: 기본 기능"},"4":{"body":"연관 타입이란 일종의 타입 플레이스홀더입니다. 플레이스홀더로 지정되었을 때는 무슨 타입인지 모릅니다. 나중에 (impl키워드를 써서) 구현할 때 무슨 타입인지 정하면 됩니다. struct나 trait 키워드로 정의할 때 임의의 타입을 지정해놓는(placeholder) 목적으로 사용. pub trait Iterator { // 플레이스홀더를 지정해놓음 type Item; fn next(&mut self) -> Option<Self::Item>; } impl 키워드로 struct나 trait의 구현할 때 type도 타입 별칭 방식으로 구현해야 함 struct Counter {} pub trait Iterator { // 플레이스홀더를 지정해놓음 type Item; fn next(&mut self) -> Option<Self::Item>;\n}\nimpl Iterator for Counter { // 플레이스홀더로 잡아놓은 타입-> // 타입별칭과 같은 방법을 써서 연관 타입을 구현 type Item = u32; fn next(&mut self) -> Option<Self::Item> { // --snip-- Some(5) }}","breadcrumbs":"trait과 type » 연관 타입(associated type) 작성: 응용 기능","id":"4","title":"연관 타입(associated type) 작성: 응용 기능"},"5":{"body":"예시 코드를 하나 만들어서 컴파일러가 알려주는 에러들을 살펴봅시다. 1.49기준으로 나오는 에러들입니다. // free type alias without body\n// 즉 type 키워드가 type alias로 인식되었고\n// type alias는 바디가 없으면 안 됩니다.\n// type A;\n// type alias로 인식되었고 에러가 나지 않습니다.\ntype B = i32; fn c() { // type alias로 인식되었고 에러가 나지 않습니다. type D = i32; // type alias로 인식되었고 바디가 없다고 에러가 납니다. // type E;\n} 일반적인 환경에서나 함수에서 type 키워드가 쓰이면 모두 type alias로 인식됩니다. type alias는 반드시 우변, body가 필요하다고 말해주고요. 구조체에서는 어떨까요? struct F { // 구조체에는 identifier가 나와야 하는데 // type이라는 키워드가 나와서 바로 에러입니다. // type G = i32; // type H;\n} // 구조체를 정의할 때는 `type`키워드 자체가 나오면 안 된다고 하네요. 구조체의 목적을 생각해보면 당연하죠. // 마지막으로 가장 중요한 trait에서 어떻게 작동하는지 봅시다. trait I { // J, K는 associated type으로 인식하고 에러가 나지 않습니다. // type J; type K; // L, M은 associated type으로 인식하고 // associated type defaults are unstable 라는 에러가 나옵니다. // type L = i32; // type M = i32;\n} impl I for F { // associated type으로 인식하고 // associated type은 impl에서 바디가 꼭 있어야 한다는 // 에러가 나옵니다. // type J; // associated type으로 인식하고 에러가 나오지 않습니다 type K = i32; // associated type으로 인식하고 // associated type은 impl에서 바디가 꼭 있어야 한다는 // 에러가 나옵니다. // type L; // associated type으로 인식하고 에러가 나오지 않지만 // trait에서 이미 에러가 났죠. // type M = i32; // N, O는 I 트레잇 소속이 아니라서 is not a member of trait `I` 에러가 나옵니다. // type N; // type O = i32;\n} 최대한 많은 경우의 수를 보여드렸는데 정리하면 다음과 같습니다. |위치|인식|body| |-|-|-| |trait 블록|associated type|없어야 함(허용 예정)| |trait 구현 블록|associated type|있어야 함| |나머지|type alias|있어야 함| trait 블록에서 fn키워드(메서드)의 경우에는 시그니처만 있어도 되고 함수 구현이 들어가면 기본값이 됩니다. 그런데 type키워드(associated type)는 아직 기본갑을 줄 수 없습니다. 1.49 기준으로 unstable하여 아직은 기본값을 못 주게 되어 있다고 합니다.","breadcrumbs":"trait과 type » 컴파일러는 어떻게 구분할까?","id":"5","title":"컴파일러는 어떻게 구분할까?"},"6":{"body":"일단 type alias는 많이 쓰고 associated type은 별로 쓰지 않아서 생각만큼 큰 문제는 아닙니다. 그래도 문서의 목적이 별로 유용하지는 않은 내용을 다루는 것이니까 살펴봅시다. 원래 associated type은 제네릭에서 나온 개념으로 Rust by Example 에서는 제네릭 챕터에서 설명합니다. 즉 rust에서 associated type은 제네릭 타입을 써서 표현할 수 있는 코드를 좀 더 간결하게 표현하는데 사용됩니다.","breadcrumbs":"trait과 type » 왜 이렇게 개념이 복잡한가?","id":"6","title":"왜 이렇게 개념이 복잡한가?"}},"length":7,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"1":{".":{"4":{"9":{"df":1,"docs":{"5":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"2":{".":{"2":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"5":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"a":{"df":4,"docs":{"2":{"tf":1.0},"3":{"tf":1.0},"5":{"tf":3.0},"6":{"tf":1.0}}},"df":0,"docs":{}}},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"i":{"a":{"df":1,"docs":{"2":{"tf":1.0}},"t":{"df":0,"docs":{},"e":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"y":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":3,"docs":{"4":{"tf":1.0},"5":{"tf":3.3166247903554},"6":{"tf":1.7320508075688772}}}},"df":0,"docs":{}}}}},"b":{"df":1,"docs":{"5":{"tf":1.0}},"o":{"d":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"x":{"<":{"d":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"c":{"df":1,"docs":{"5":{"tf":1.0}},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}}}}}},"d":{"df":1,"docs":{"5":{"tf":1.0}},"e":{"df":0,"docs":{},"f":{"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":1,"docs":{"5":{"tf":1.0}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"6":{"tf":1.0}}}}}},"df":0,"docs":{}}},"f":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"n":{"df":3,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772},"5":{"tf":1.4142135623730951}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"g":{"df":1,"docs":{"5":{"tf":1.0}}},"h":{"df":1,"docs":{"5":{"tf":1.0}}},"i":{"3":{"2":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"5":{"tf":2.8284271247461903}}},"df":0,"docs":{}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}}},"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":2,"docs":{"4":{"tf":1.7320508075688772},"5":{"tf":1.7320508075688772}}}}},"o":{":":{":":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}},"r":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"j":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}},"k":{"df":1,"docs":{"5":{"tf":1.7320508075688772}},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"l":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":1,"docs":{"5":{"tf":1.7320508075688772}},"e":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"5":{"tf":1.0}}}}},"df":0,"docs":{}}}},"n":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"e":{"df":0,"docs":{},"x":{"df":0,"docs":{},"t":{"(":{"&":{"df":0,"docs":{},"m":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"o":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"p":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"<":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{":":{":":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}}},"p":{"df":0,"docs":{},"l":{"a":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"df":0,"docs":{},"x":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}},"u":{"b":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"<":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":1,"docs":{"3":{"tf":1.7320508075688772}}}}}}},"u":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"6":{"tf":1.4142135623730951}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}},"n":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}}}},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"(":{"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"t":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}},"d":{":":{":":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{":":{":":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":2,"docs":{"4":{"tf":1.7320508075688772},"5":{"tf":1.0}}}},"df":0,"docs":{}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}},"t":{"a":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"_":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"_":{"df":0,"docs":{},"t":{"df":0,"docs":{},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"(":{"df":0,"docs":{},"f":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{},"h":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}}},"r":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":4,"docs":{"0":{"tf":1.0},"1":{"tf":1.0},"4":{"tf":2.0},"5":{"tf":2.6457513110645907}}}}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"a":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}},"df":7,"docs":{"0":{"tf":1.0},"1":{"tf":1.0},"2":{"tf":1.7320508075688772},"3":{"tf":1.7320508075688772},"4":{"tf":2.23606797749979},"5":{"tf":6.4031242374328485},"6":{"tf":2.0}},"키":{"df":0,"docs":{},"워":{"df":0,"docs":{},"드":{"(":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}},"u":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":1,"docs":{"5":{"tf":1.4142135623730951}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}}},"x":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"y":{"df":1,"docs":{"3":{"tf":1.7320508075688772}}}}},"breadcrumbs":{"root":{"1":{".":{"4":{"9":{"df":1,"docs":{"5":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"2":{".":{"2":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"5":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"a":{"df":4,"docs":{"2":{"tf":1.0},"3":{"tf":1.4142135623730951},"5":{"tf":3.0},"6":{"tf":1.0}}},"df":0,"docs":{}}},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"i":{"a":{"df":1,"docs":{"2":{"tf":1.0}},"t":{"df":0,"docs":{},"e":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"y":{"df":0,"docs":{},"p":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":3,"docs":{"4":{"tf":1.4142135623730951},"5":{"tf":3.3166247903554},"6":{"tf":1.7320508075688772}}}},"df":0,"docs":{}}}}},"b":{"df":1,"docs":{"5":{"tf":1.0}},"o":{"d":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"x":{"<":{"d":{"df":0,"docs":{},"y":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"c":{"df":1,"docs":{"5":{"tf":1.0}},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}}}}}},"d":{"df":1,"docs":{"5":{"tf":1.0}},"e":{"df":0,"docs":{},"f":{"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"e":{"df":1,"docs":{"5":{"tf":1.0}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"6":{"tf":1.0}}}}}},"df":0,"docs":{}}},"f":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"n":{"df":3,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772},"5":{"tf":1.4142135623730951}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"e":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"g":{"df":1,"docs":{"5":{"tf":1.0}}},"h":{"df":1,"docs":{"5":{"tf":1.0}}},"i":{"3":{"2":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"5":{"tf":2.8284271247461903}}},"df":0,"docs":{}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}}},"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":2,"docs":{"4":{"tf":1.7320508075688772},"5":{"tf":1.7320508075688772}}}}},"o":{":":{":":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}},"r":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"j":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}},"k":{"df":1,"docs":{"5":{"tf":1.7320508075688772}},"i":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"l":{"df":1,"docs":{"5":{"tf":1.7320508075688772}}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":1,"docs":{"5":{"tf":1.7320508075688772}},"e":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"5":{"tf":1.0}}}}},"df":0,"docs":{}}}},"n":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"e":{"df":0,"docs":{},"x":{"df":0,"docs":{},"t":{"(":{"&":{"df":0,"docs":{},"m":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"o":{"df":1,"docs":{"5":{"tf":1.4142135623730951}},"p":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"<":{"df":0,"docs":{},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{":":{":":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}}},"p":{"df":0,"docs":{},"l":{"a":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"df":0,"docs":{},"x":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}},"u":{"b":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"<":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":1,"docs":{"3":{"tf":1.7320508075688772}}}}}}},"u":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"6":{"tf":1.4142135623730951}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}},"n":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"p":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}}}},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"(":{"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"t":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"c":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}},"d":{":":{":":{"df":0,"docs":{},"i":{"df":0,"docs":{},"o":{":":{":":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":2,"docs":{"4":{"tf":1.7320508075688772},"5":{"tf":1.0}}}},"df":0,"docs":{}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}},"t":{"a":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"_":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"_":{"df":0,"docs":{},"t":{"df":0,"docs":{},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"(":{"df":0,"docs":{},"f":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{},"h":{"df":0,"docs":{},"u":{"df":0,"docs":{},"n":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}}},"r":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":7,"docs":{"0":{"tf":1.4142135623730951},"1":{"tf":1.7320508075688772},"2":{"tf":1.0},"3":{"tf":1.0},"4":{"tf":2.23606797749979},"5":{"tf":2.8284271247461903},"6":{"tf":1.0}}}}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"a":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}}},"df":7,"docs":{"0":{"tf":1.4142135623730951},"1":{"tf":1.7320508075688772},"2":{"tf":2.23606797749979},"3":{"tf":2.23606797749979},"4":{"tf":2.6457513110645907},"5":{"tf":6.48074069840786},"6":{"tf":2.23606797749979}},"키":{"df":0,"docs":{},"워":{"df":0,"docs":{},"드":{"(":{"a":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"5":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}},"u":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":1,"docs":{"5":{"tf":1.4142135623730951}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"w":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"5":{"tf":1.0}}}}}}}}},"x":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"y":{"df":1,"docs":{"3":{"tf":1.7320508075688772}}}}},"title":{"root":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"a":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"c":{"df":0,"docs":{},"i":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":2,"docs":{"0":{"tf":1.0},"1":{"tf":1.0}}}}},"df":0,"docs":{}},"y":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":5,"docs":{"0":{"tf":1.0},"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":1.0},"4":{"tf":1.0}}}}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});
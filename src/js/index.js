// 코드가 너무 길어지면 가독성이 너무 떨어져서 짧게 하기위해 중복으로 언급되는건 따로 변수로 만들어주기
const $ = (selector) => document.querySelector(selector);

function App(){
// 카페 음료 카운팅 변수처리
	const updateMenuCount= () => {
		const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
			$('.menu-count').innerText = `총 ${menuCount}개`;
	};

	//메뉴이름 수정하기
	$("#espresso-menu-list").addEventListener('click', (e) => {
		if(e.target.classList.contains("menu-edit-button")){
			const menuName = e.target.closest('li').querySelector('.menu-name').innerText;
			const modifingName = prompt('메뉴이름을 수정하세요.', menuName);
			// 클릭한 수정 버튼의 가장 가까운 li태그를 찾는다.
			e.target
				.closest('li')
				.querySelector('.menu-name').innerText = modifingName;
		}
	//메뉴 삭제 
	if(e.target.classList.contains('menu-remove-button')){
		if(confirm("정말 삭제할까요?")){
			e.target.closest('li').remove();
			updateMenuCount();
		}
	}
	});
// 위의 코드 중 반복되는 코드 줄여보기(리팩터링)
	// $("#espresso-menu-list").addEventListener('click', (e) => {
	// 	if(e.target.classList.contains("menu-edit-button")){
	// 		const $menuName = e.target.closest('li').querySelector('.menu-name');
	// 		const modifingName = prompt('메뉴이름을 수정하세요.', $menuName.innerText );
	// 		// 클릭한 수정 버튼의 가장 가까운 li태그를 찾는다.
	// 		$menuName.innerText = modifingName;
	// 	}
	// });

	// 엔터 쳤을때 자동으로 submit 보내기 방지
	$("#espresso-menu-form").addEventListener("submit", (e)=> {
		e.preventDefault();
	});
	// 반복되는 li 리스트 변수로 묶기
	const espressoMenuAddName = () => {
		// 빈 값인데 리스트에 추가되는거 방지
		if($("#espresso-menu-name").value === ""){
			alert('메뉴를 입력해주세요.');
			return;
		}
			const espressoMenuName = $('#espresso-menu-name').value;
			const menuItemList = (espressoMenuName) => {
				return(
				`<li class="menu-list-item d-flex items-center py-2">
				<span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
				<button
				type="button"
				class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
				>
				수정
				</button>
				<button
				type="button"
				class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
				>
				삭제
				</button>
				</li>`)
			};
			$('#espresso-menu-list').insertAdjacentHTML('beforeend',menuItemList(espressoMenuName)
			);

			// 음료 카운팅
			updateMenuCount();
			$("#espresso-menu-name").value = '';
	}
	// 클릭버튼
	$('#espresso-menu-submit-button').addEventListener('click', ()=> {
		espressoMenuAddName();
	} )

	//메뉴 이름 입력
	$("#espresso-menu-name").addEventListener('keypress', (e) => {
		if(e.key !=='Enter'){
			return;
		}
		espressoMenuAddName();
	});

	
};

App()
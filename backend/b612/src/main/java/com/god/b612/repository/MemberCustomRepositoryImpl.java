package com.god.b612.repository;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.dto.MemberResponseDtoForRank;
import com.god.b612.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository {

    @Autowired
    private final MemberRepository memberRepository;

    static String[] adjective = {"아름다운", "우아한", "매혹적인", "섬세한", "빛나는", "찬란한", "화려한", "신비로운", "MZ세대", "참신한", "ENFP", "꿈꾸는", "급찐급빠", "유쾌한", "4차원", "부자", "졸린", "메롱하는", "노란", "푸른 눈의", "볼빨간", "어제 태닝한", "하얀", "자연스러운", "환상적인", "고귀한", "맑은", "매끄러운", "잉스러운", "귀여운", "참을성 있는", "독특한", "부드럽고 따뜻한", "건강한", "능숙한", "지혜로운", "자랑스러운", "무서운", "지적인", "친절한", "참된", "쾌활한", "다정한", "달콤한", "감각적인", "인상적인", "신뢰할 수 있는", "진실된", "맛있는", "적극적인", "돈 잘 갚는", "현실적인", "시원한", "활기찬", "유능한", "단호한", "진중한", "정확한", "자부심 있는", "유순한", "바람직한", "도전적인", "재미있는", "청렴한", "성숙한", "질투하는", "안정된", "효율적인", "불굴의 한국인", "자유로운"};
    static String[] noun = {"탐정", "잠꾸러기", "토끼", "탐험가", "달걀", "달팽이", "생크림", "바퀴", "비행사", "피카"};

    @Override
    public String[] makeRandomNickName() {
        String[] ret = new String[2];
        StringBuilder sb = new StringBuilder();
        sb.append(adjective[(int) (Math.random() * adjective.length)]);
        sb.append(" ");
        int randomNumber = (int) (Math.random() * noun.length);
        sb.append(noun[randomNumber]);
        int settingNumber = 1;
        Member foundMember = memberRepository.findTopByOrderByMemberIdDesc();
        if (foundMember != null) {
            settingNumber = foundMember.getMemberId() + 1;
            System.out.println(settingNumber);
        }
        sb.append(" #");
        sb.append(settingNumber);
        ret[0] = sb.toString();
        switch (randomNumber) {
            case 0: // 탐정
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%90%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A5%E1%86%BC.PNG?alt=media";
                break;
            case 1: // 잠꾸러기
                ret[1] ="https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%8C%E1%85%A1%E1%86%B7%E1%84%81%E1%85%AE%E1%84%85%E1%85%A5%E1%84%80%E1%85%B5.PNG?alt=media";
                break;
            case 2: // 토끼
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%90%E1%85%A9%E1%84%81%E1%85%B5.PNG?alt=media";
                break;
            case 3: // 탐험가
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%90%E1%85%A1%E1%86%B7%E1%84%92%E1%85%A5%E1%86%B7%E1%84%80%E1%85%A1.PNG?alt=media";
                break;
            case 4: // 달걀
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%83%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A3%E1%86%AF.PNG?alt=media";
                break;
            case 5: // 달팽이
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%83%E1%85%A1%E1%86%AF%E1%84%91%E1%85%A2%E1%86%BC%E1%84%8B%E1%85%B5.PNG?alt=media";
                break;
            case 6: // 생크림
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B7.PNG?alt=media";
                break;
            case 7: // 바퀴
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%87%E1%85%A1%E1%84%8F%E1%85%B1.PNG?alt=media";
                break;
            case 8: // 비행사
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%87%E1%85%B5%E1%84%92%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A1.PNG?alt=media";
                break;
            case 9: // 피카
                ret[1] = "https://firebasestorage.googleapis.com/v0/b/find-your-b612.appspot.com/o/%E1%84%91%E1%85%B5%E1%84%8F%E1%85%A1.PNG?alt=media";
                break;

        }
        return ret;
    }

    @Override
    public Boolean updateMember(String url, String address) {
        Member foundMember = memberRepository.findMemberByMemberAddress(address);
        if(foundMember == null){
            return false;
        }
        Member changedMember = Member.builder()
                .memberId(foundMember.getMemberId())
                .memberNickname(foundMember.getMemberNickname())
                .memberAddress(foundMember.getMemberAddress())
                .memberImage(url)
                .memberTierId(foundMember.getMemberTierId())
                .memberHighestScore(foundMember.getMemberHighestScore())
                .memberCurrentScore(foundMember.getMemberCurrentScore())
                .memberLiked(foundMember.getMemberLiked())
                .build();
        memberRepository.save(changedMember);
        return true;
    }


    @Override
    public MemberResponseDto createMemberResponseDtoByEntity(Member member) {
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .memberAddress(member.getMemberAddress())
                .memberNickname(member.getMemberNickname())
                .memberTierName(member.getMemberTierId().getTierName())
                .memberCurrentScore(member.getMemberCurrentScore())
                .memberImage(member.getMemberImage())
                .memberLiked(member.getMemberLiked())
                .build();

        return memberResponseDto;
    }
    @Override
    public MemberResponseDtoForRank makeMemberDtoForRank(Member member, int rank) {
        MemberResponseDtoForRank memberResponseDtoForRank=MemberResponseDtoForRank.builder()
                .rank(rank)
                .memberId(member.getMemberId())
                .memberAddress(member.getMemberAddress())
                .memberNickname(member.getMemberNickname())
                .memberTierName(member.getMemberTierId().getTierName())
                .memberCurrentScore(member.getMemberCurrentScore())
                .memberImage(member.getMemberImage())
                .memberLiked(member.getMemberLiked())
                .build();

        return memberResponseDtoForRank;
    }

}

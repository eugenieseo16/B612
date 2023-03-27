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

    static String[] adjective = {"아름다운", "우아한", "매혹적인", "섬세한", "빛나는", "찬란한", "화려한", "신비로운", "선명한", "참신한", "아늑한", "우주적인", "부드러운", "유쾌한", "절묘한", "풍부한", "투명한", "참다운", "노란", "푸른", "붉은", "검은", "하얀", "자연스러운", "환상적인", "고귀한", "맑은", "매끄러운", "미묘한", "귀여운", "참을성 있는", "독특한", "부드럽고 따뜻한", "건강한", "능숙한", "지혜로운", "자랑스러운", "무서운", "지적인", "친절한", "참된", "쾌적한", "다정한", "달콤한", "감각적인", "인상적인", "신뢰할 수 있는", "진실된", "맛있는", "적극적인", "균형잡힌", "현실적인", "시원한", "활기찬", "유능한", "단호한", "진중한", "정확한", "자부심 있는", "유순한", "바람직한", "도전적인", "재미있는", "청렴한", "성숙한", "동경스러운", "안정된", "효율적인", "불굴의", "자유로운"};
    static String[] noun = {"왕자", "별", "여우", "장미", "소행성", "행성", "뱀", "바오밥나무", "램프", "달", "로봇", "사업가"};

    @Override
    public String makeRandomNickName() {
        StringBuilder sb = new StringBuilder();
        sb.append(adjective[(int) (Math.random() * adjective.length)]);
        sb.append(" ");
        sb.append(noun[(int) (Math.random() * noun.length)]);
        int settingNumber = 1;
        Member foundMember = memberRepository.findTopByOrderByMemberIdDesc();
        if (foundMember != null) {
            settingNumber = foundMember.getMemberId() + 1;
            System.out.println(settingNumber);
        }
        sb.append(" #");
        sb.append(settingNumber);

        return sb.toString();
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
